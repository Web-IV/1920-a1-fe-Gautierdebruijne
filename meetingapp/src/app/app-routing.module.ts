import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then(mod => mod.MeetingModule)
  },
  // {path: '', redirectTo: 'meeting/list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
