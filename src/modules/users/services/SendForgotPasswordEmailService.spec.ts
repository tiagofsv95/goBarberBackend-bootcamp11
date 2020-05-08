import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@test.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be not able to recover a non-existing user password', async () => {
    jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@test.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
