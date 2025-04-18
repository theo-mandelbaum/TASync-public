import { Button, ButtonGroup } from "@chakra-ui/react";

export default function SubjectButtons({ subjects, onSubjectClick }) {
  if (!subjects || subjects.length === 0) {
    return <p>No subjects available</p>;
  }
  return (
    <ButtonGroup>
      {subjects.map((subject) => (
        <Button key={subject.id} onClick={() => onSubjectClick(subject.id)}>
          {subject.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}
