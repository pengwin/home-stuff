import { ErrorContext, Middleware } from './auth-service-client';

export class ApiMiddleware implements Middleware {
    private readonly subscriptions: ((context: ErrorContext) => void)[] = [];

    public subscribe(subscription: (context: ErrorContext) => void) {
        this.subscriptions.push(subscription);
    }

    public onError(context: ErrorContext): Promise<Response | void> {
        console.error(context.error);
        this.subscriptions.forEach(subscription => subscription(context));
        return Promise.resolve(context.response);
    }
}
