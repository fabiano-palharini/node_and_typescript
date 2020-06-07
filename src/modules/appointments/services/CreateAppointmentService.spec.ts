import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository  from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {

    beforeEach(() => {
      fakeAppointmentsRepository  = new FakeAppointmentsRepository();
      createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);
    })


    it('should be able to create a new appointment', async () => {
      const appointment = await createAppointmentService.execute({date: new Date(), user_id: '123456', provider_id: '123123'});

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('123123');
      expect(appointment.user_id).toBe('123456');


    });

    it('should not be able to create two appointments at the same time', async () => {
      const appointmentDate = new Date(2020, 4, 25, 11);

      const appointment = await createAppointmentService.execute({date: appointmentDate, user_id: '123456', provider_id: '123123'});

      await expect(createAppointmentService.execute({date: appointmentDate, user_id: '123456', provider_id: '123123'})).rejects.toBeInstanceOf(AppError);

    });
})
