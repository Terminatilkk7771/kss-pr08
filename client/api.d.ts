// Автоматично типізовані контракти клієнта на основі openapi.json (додаткове завдання п. 1)
export interface components {
  schemas: {
    TicketStatus: 'open' | 'in_progress' | 'resolved' | 'closed';
    Priority: 'low' | 'medium' | 'high' | 'critical';
    TicketEntity: {
      readonly id: number;
      title: string;
      description?: string;
      status: components['schemas']['TicketStatus'];
      priority: components['schemas']['Priority'];
      readonly authorId: number;
      assigneeId: number | null;
      readonly createdAt: string;
      readonly updatedAt: string;
      tags: string[];
    };
    TicketPage: {
      items: components['schemas']['TicketEntity'][];
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface paths {
  '/tickets': {
    get: {
      parameters: {
        query?: {
          page?: number;
          pageSize?: number;
          status?: components['schemas']['TicketStatus'];
          priority?: components['schemas']['Priority'];
          authorId?: number;
          assigneeId?: number;
          q?: string;
          sort?: 'createdAt' | '-createdAt' | 'priority' | '-priority';
        };
      };
      responses: {
        200: {
          content: {
            'application/json': components['schemas']['TicketPage'];
          };
        };
      };
    };
  };
}
