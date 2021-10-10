import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: 'prueba',
        children: [
            {
                path: 'qrvey', loadChildren: () => import('../app/modules/modules.module').then(m => m.ModulesModule)
            }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }