export type JobPosting = {
  id: string;
  created_at?: string | null;
  title?: string | null;
  slug?: string | null;
  department?: string | null;
  industry?: string | null;
  location?: string | null;
  work_model?: string | null;
  employment_type?: string | null;
  salary_range?: string | null;
  short_summary?: string | null;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  preferred_qualifications?: string | null;
  application_deadline?: string | null;
  status?: string | null;
  featured?: boolean | null;
};

export type JobFilters = {
  q: string;
  location: string;
  employmentType: string;
  workModel: string;
  industry: string;
};

export const emptyJobFilters: JobFilters = {
  q: "",
  location: "",
  employmentType: "",
  workModel: "",
  industry: "",
};

type SearchParamValue = string | string[] | undefined;

function firstValue(value: SearchParamValue) {
  return (Array.isArray(value) ? value[0] : value)?.trim().slice(0, 100) ?? "";
}

export function parseJobFilters(
  searchParams: Record<string, SearchParamValue>
): JobFilters {
  return {
    q: firstValue(searchParams.q),
    location: firstValue(searchParams.location),
    employmentType: firstValue(searchParams.type),
    workModel: firstValue(searchParams.work),
    industry: firstValue(searchParams.industry),
  };
}

export function buildJobSearchParams(
  filters: JobFilters,
  omit?: keyof JobFilters
) {
  const params = new URLSearchParams();
  const entries: Array<[keyof JobFilters, string, string]> = [
    ["q", "q", filters.q],
    ["location", "location", filters.location],
    ["employmentType", "type", filters.employmentType],
    ["workModel", "work", filters.workModel],
    ["industry", "industry", filters.industry],
  ];

  for (const [filterKey, queryKey, value] of entries) {
    if (filterKey !== omit && value) params.set(queryKey, value);
  }

  const query = params.toString();
  return query ? `/jobs?${query}` : "/jobs";
}

function includes(value: string | null | undefined, query: string) {
  return value?.toLocaleLowerCase().includes(query) ?? false;
}

function equals(value: string | null | undefined, selected: string) {
  return value?.toLocaleLowerCase() === selected.toLocaleLowerCase();
}

export function filterJobs(jobs: JobPosting[], filters: JobFilters) {
  const keyword = filters.q.toLocaleLowerCase();

  return jobs.filter((job) => {
    const keywordMatch =
      !keyword ||
      [
        job.title,
        job.department,
        job.industry,
        job.location,
        job.short_summary,
        job.description,
      ].some((value) => includes(value, keyword));

    return (
      keywordMatch &&
      (!filters.location || equals(job.location, filters.location)) &&
      (!filters.employmentType ||
        equals(job.employment_type, filters.employmentType)) &&
      (!filters.workModel || equals(job.work_model, filters.workModel)) &&
      (!filters.industry || equals(job.industry, filters.industry))
    );
  });
}

function uniqueValues(jobs: JobPosting[], key: keyof JobPosting) {
  return Array.from(
    new Set(
      jobs
        .map((job) => job[key])
        .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
        .map((value) => value.trim())
    )
  ).sort((left, right) => left.localeCompare(right));
}

export function getJobFilterOptions(jobs: JobPosting[]) {
  return {
    locations: uniqueValues(jobs, "location"),
    employmentTypes: uniqueValues(jobs, "employment_type"),
    workModels: uniqueValues(jobs, "work_model"),
    industries: uniqueValues(jobs, "industry"),
  };
}

const dayInMilliseconds = 86_400_000;

function utcDay(value: Date) {
  return Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());
}

export function getJobIndicators(job: JobPosting, now = new Date()) {
  const today = utcDay(now);
  const createdAt = job.created_at ? new Date(job.created_at) : null;
  const deadline = job.application_deadline
    ? new Date(`${job.application_deadline}T00:00:00.000Z`)
    : null;
  const createdDifference =
    createdAt && !Number.isNaN(createdAt.valueOf())
      ? today - utcDay(createdAt)
      : Number.POSITIVE_INFINITY;
  const deadlineDifference =
    deadline && !Number.isNaN(deadline.valueOf())
      ? utcDay(deadline) - today
      : Number.POSITIVE_INFINITY;

  return {
    isNew:
      createdDifference >= 0 &&
      createdDifference < 7 * dayInMilliseconds,
    isClosingSoon:
      deadlineDifference >= 0 &&
      deadlineDifference <= 7 * dayInMilliseconds,
  };
}

export function formatJobDeadline(value?: string | null) {
  if (!value) return "Open until filled";
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf())) return value;

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getRelatedJobs(
  current: JobPosting,
  jobs: JobPosting[],
  limit = 3
) {
  return jobs
    .filter((job) => job.id !== current.id)
    .map((job) => {
      const reasons: string[] = [];
      let score = 0;

      if (current.industry && equals(job.industry, current.industry)) {
        score += 4;
        reasons.push("same industry");
      }
      if (current.department && equals(job.department, current.department)) {
        score += 3;
        reasons.push("same department");
      }
      if (current.work_model && equals(job.work_model, current.work_model)) {
        score += 2;
        reasons.push("same workplace arrangement");
      }
      if (
        current.employment_type &&
        equals(job.employment_type, current.employment_type)
      ) {
        score += 2;
        reasons.push("same employment type");
      }
      if (current.location && equals(job.location, current.location)) {
        score += 1;
        reasons.push("same location");
      }

      return { job, score, reasons };
    })
    .filter((match) => match.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        String(right.job.created_at ?? "").localeCompare(
          String(left.job.created_at ?? "")
        )
    )
    .slice(0, limit);
}
