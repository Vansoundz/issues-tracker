interface Issue {
  id: string;
  title: string;
  body: string;
  author: {
    login: string;
  };
  assignees: {
    totalCount: number;
    nodes: { login: string }[];
  };
  labels: {
    totalCount: number;
    nodes: [
      {
        color: string;
        name: string;
      }
    ];
  };
  comments: {
    totalCount: number;
  };
}

export type { Issue };
