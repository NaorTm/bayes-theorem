import examplesData from "./examples.json" with { type: "json" };

export const examples = examplesData;

export function getExampleById(exampleId) {
  return examples.find((example) => example.id === exampleId);
}
