import {Component, inject} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  protected currentLang = this.translate.getCurrentLang() ?? 'en';

  protected readonly languages: string[] = [...this.translate.getLangs()];

  protected useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = language;
  }
}
