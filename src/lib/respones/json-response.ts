export class JsonResponse {
  public status: number;
  public message: string;
  public data: Record<string, any>;

  constructor(props: {
    status?: number;
    message?: string;
    data?: Record<string, any> | Record<string, any>[];
  }) {
    this.status = props.status || 200;
    this.message = props.message || "Success";
    this.data = props.data || {};
  }
}
