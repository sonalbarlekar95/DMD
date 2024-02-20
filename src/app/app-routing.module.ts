import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'home', component: DashboardComponent},
  { path: 'users', component: ItemListComponent},
  { path: 'user/details', component: ItemDetailsComponent},
  { path: 'user/details/:id', component: ItemDetailsComponent},
  { path: 'user/add-new', component: ItemDetailsComponent},
  { path: 'user/edit/:id', component: ItemDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
