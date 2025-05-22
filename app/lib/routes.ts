// lib/routes.ts
export type RouteParams = Record<string, string | number>;

export type RouteConfig = {
    path: string;
    dynamic?: string[];
    query?: Record<string, string>;
};

export type NestedRoutes = {
    [key: string]: NestedRoutes | RouteConfig | string;
};

const createRoutes = <T extends NestedRoutes>(config: T): T => config;

export const withQuery = (path: string, query?: RouteParams) => {
    if (!query) return path;
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
    });
    return `${path}?${params.toString()}`;
};

export const routes = createRoutes({
    dashboard: {
        path: "/dashboard",
        invoices: {
            path: "/dashboard/invoices",
            list: "/dashboard/invoices",
            create: "/dashboard/invoices/create",
            // view: (id: string | number) => `/dashboard/invoices/${id}`,
            edit: (id: string | number) => `/dashboard/invoices/edit/${id}`,
        },
        customers: {
            path: "/dashboard/customers",
            list: "/dashboard/customers",
            // view: (id: string | number) => `/dashboard/customers/${id}`,
        },
    },
    auth: {
        login: "/login",
        register: "/register",
        forgotPassword: "/forgot-password",
    },
    public: {
        home: "/",
        about: "/about",
        contact: "/contact",
    },
});

// Type helpers for route generation
export type AppRoutes = typeof routes;