import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SymptomcheckerComponent } from './symptomchecker/symptomchecker.component';
import { AuthGuard } from './authentication/auth.guard';
import { RoleGuard } from './authentication/role.guard';
// import { PersonalGuard } from './authentication/personal.guard';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './user/details/details.component';
import { ListComponent } from './user/list/list.component';
import { EmergencyComponent } from './emergency/emergency.component';

// 2018.03.30 - 12:34:17 - created app.routing for all routes in application

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'emergency', component: EmergencyComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: DetailsComponent, canActivate: [AuthGuard] },
    { path: 'patients', component: ListComponent, canActivate: [AuthGuard, RoleGuard] },
    { path: 'symptomchecker', component: SymptomcheckerComponent, canActivate: [AuthGuard] },
    // {
    //     path: 'students',
    //     component: StudentsComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: '', component: ListComponent },
    //         // only admins can create new students
    //         { path: 'create', component: CreateComponent, canActivate: [RoleGuard] },
    //         // 2018.03.31 - 16:53:36 - students can only edit THEIR OWN profiles
    //         { path: 'update', component: UpdateComponent, canActivate: [PersonalGuard] },
    //         { path: 'details', component: DetailsComponent },
    //     ],
    // },
    // {
    //     path: 'courses',
    //     component: CoursesComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: '', component: ListCoursesComponent },
    //         { path: 'create', component: CreateCourseComponent, canActivate: [RoleGuard] },
    //         { path: 'update', component: UpdateCourseComponent, canActivate: [RoleGuard] },
    //         { path: 'details', component: CourseDetailComponent },
    //     ]
    // },
    // { path: 'profile', redirectTo: 'students/details' },
    { path: '**', redirectTo: 'home' }
    // { path: '**', redirectTo: 'profile' }
];

export const routing = RouterModule.forRoot(appRoutes);
