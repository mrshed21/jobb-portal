import Link from "next/link";



export default function DepartmentFilter({ departments, active }) {
  const pillBase =
    "glass-pill hover:bg-white/10 transition-colors";
  const pillActive =
    "bg-white/15 border-white/25 text-white";
  const pillInactive = "";

  return (
    <nav
      aria-label="Filtrera efter avdelning"
      className="flex flex-wrap gap-2 mb-8"
    >

      <Link
        href="/jobs"
        className={`${pillBase} ${!active ? pillActive : pillInactive}`}
      >
        Alla
      </Link>

      {departments.map((dept) => {
        const isActive = active === dept.value;
        return (
          <Link
            key={dept.value}
            href={`/jobs?department=${encodeURIComponent(dept.value)}`}
            className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
          >
            {dept.name}
          </Link>
        );
      })}
    </nav>
  );
}
