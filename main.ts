import { AppComponent } from './src/app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch(err => console.error(err));
