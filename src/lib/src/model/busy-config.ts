import {Subscription} from 'rxjs';
import {Component, TemplateRef, Type, Inject, ChangeDetectorRef} from '@angular/core';

export class BusyConfig implements IBusyConfig {
    template: TemplateRef<any> | Type<any>;
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;

    constructor(config: IBusyConfig = {}) {
        for (const option of Object.keys(BUSY_CONFIG_DEFAULTS)) {
            this[option] = config[option] !== undefined ? config[option] : BUSY_CONFIG_DEFAULTS[option];
        }
    }
}

@Component({
    selector: 'default-busy',
    template: `
        <div class="ng-busy-default-wrapper">
            <div class="ng-busy-default-sign">
                <div class="ng-busy-default-spinner">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                </div>
                <div class="ng-busy-default-text">{{message}}</div>
            </div>
        </div>
    `,
})
export class DefaultBusyComponent {
    private _msg: string;

    constructor(@Inject('message') private msg: string, private _changeDetectionRef: ChangeDetectorRef) {
    }

    get message() {
        if (this._msg === undefined) {
            this.message = this.msg;
        }
        return this._msg;
    }

    set message(msg: string) {
        this._msg = msg;
        this._changeDetectionRef.detectChanges();
    }
}

export interface IBusyConfig {
    template?: TemplateRef<any> | Type<any>;
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}

export const BUSY_CONFIG_DEFAULTS = {
    template: DefaultBusyComponent,
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy'
};
