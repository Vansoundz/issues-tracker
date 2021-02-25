interface Issue {
  id: string;
  title: string;
  body: string;
  closed: boolean;
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
    nodes: {
      author: {
        login: string;
        avatarUrl: string;
      };
      body: string;
      id: string;
    }[];
  };
}

export type { Issue };
