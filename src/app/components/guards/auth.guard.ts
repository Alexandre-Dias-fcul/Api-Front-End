import { inject } from "@angular/core";
import { AuthorizationService } from "../../services/back-office/authorization.service";
import { Router } from "@angular/router";

export const canActivateEmployee = () => {
    const authorization = inject(AuthorizationService);

    const router = inject(Router);

    const role = authorization.getRole();

    const id = authorization.getId();

    if (role && (role === 'Staff' || role === 'Agent' || role === 'Manager' || role === 'Broker'
        || role === 'Admin') && id) {
        return true;
    }
    else {
        router.navigate(['/front-page/login']);

        return false;
    }
}

export const canActivateSupervisor = () => {

    const authorization = inject(AuthorizationService);

    const router = inject(Router);

    const role = authorization.getRole();

    const id = authorization.getId();

    if (role && (role === 'Manager' || role === 'Broker' || role === 'Admin') && id) {
        return true;
    }
    else {
        router.navigate(['/front-page/login']);

        return false;
    }
}

export const canActivateAgent = () => {

    const authorization = inject(AuthorizationService);

    const router = inject(Router);

    const role = authorization.getRole();

    const id = authorization.getId();

    if (role && (role === 'Agent' || role === 'Manager' || role === 'Broker' || role === 'Admin') && id) {
        return true;
    }
    else {
        router.navigate(['/front-page/login']);

        return false;
    }
}

export const canActivateAdmin = () => {
    const authorization = inject(AuthorizationService);

    const router = inject(Router);

    const role = authorization.getRole();

    const id = authorization.getId();

    if (role && (role === 'Admin') && id) {
        return true;
    }
    else {
        router.navigate(['/front-page/login']);

        return false;
    }
}

export const canActivateUser = () => {
    const authorization = inject(AuthorizationService);

    const router = inject(Router);

    const role = authorization.getRole();

    const id = authorization.getId();

    if (role && (role === 'User') && id) {
        return true;
    }
    else {
        router.navigate(['/front-page/login-user']);

        return false;
    }
}