import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class LogoDevApi {
  private readonly baseUrl = environment.logoProviderApiBaseUrl;
  private readonly apiKey = environment.logoProviderPublishableKey;

  getUrlToLogo(websiteUrl: string): string {
    return `${this.baseUrl}${new URL(websiteUrl).hostname.replace('www.', '')}?token=${this.apiKey}`;
  }
}
