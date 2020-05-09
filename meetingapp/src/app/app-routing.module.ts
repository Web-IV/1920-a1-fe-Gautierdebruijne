import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';

const appRoutes: Routes = [
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then(mod => mod.MeetingModule),
    data: { preload: true }
  },
  {path: '', redirectTo: 'meeting/list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: SelectivePreloadStrategy})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
