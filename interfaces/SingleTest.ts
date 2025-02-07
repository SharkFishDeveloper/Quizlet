interface Test {
    id: number;
    name: string | null;
    title: string;
    description: string;
    difficulty_level: string | null;
    topic: string;
    time: string; // ISO date string
    is_published: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    duration: number; // in minutes
    end_time: string; // ISO date string
    negative_marks: number;
    correct_answer_marks: number;
    questions_count: number;
  }

  export default Test;
  