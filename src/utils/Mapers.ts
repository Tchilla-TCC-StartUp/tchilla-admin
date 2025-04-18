export const mapToDropdownOptions = (values: string[]) => {
  return values.map((label, index) => ({
    value: index,
    label,
  }));
};
