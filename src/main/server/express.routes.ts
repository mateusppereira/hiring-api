import { Express } from 'express';
import { adminRoutes } from '../../app/features/admin/routes/admin.routes';
import { recruiterRoutes } from '../../app/features/recruiter/routes/recruiter.routes';
import { candidateRoutes } from '../../app/features/candidate/routes/candidate.routes';
export const makeRoutes = (app: Express) => {
    app.use('/admin', adminRoutes());
    // app.use("/login", loginRoutes());
    app.use('/recruiter', recruiterRoutes());
    app.use('/candidate', candidateRoutes());
    // app.use("/vacancy", vacancyRoutes());
};
