export function getBadgeColor(change: number): "green" | "red" | "gray" {
    if (change > 0) return "green";
    if (change < 0) return "red";
    return "gray";
  }
  