export function getStatusBadgeClass(status) {
    if (status === "To do") return "badge bg-danger";
    if (status === "Doing") return "badge bg-warning text-dark";
    if (status === "Done") return "badge bg-success";
    return "badge bg-secondary";
  }