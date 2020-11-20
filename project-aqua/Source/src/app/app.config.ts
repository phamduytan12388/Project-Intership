import { environment } from 'src/environments/environment';

declare var window: any;
export const localStorageKey =
    window.localStorageKey || 'Aquaculture-User' + environment.API_ENDPOINT;

export const SALT =
    window.SALT ||
    'uGa5buIox4+fX4ViZ7p3TyR4cx5evpoBqFsE8dueBqheYs6faRQ1VxCr0oQ1hqXQGyjc8rKA5kWXjHMxAByt0Q==';
