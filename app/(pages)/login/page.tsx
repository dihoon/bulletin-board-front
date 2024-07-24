import ClientProvider from '@/components/ClientProvider';
import LoginFormContainer from '@/containers/LoginFormContainer';

export default function LoginPage() {
  return (
    <div className="flex h-lvh flex-col items-center justify-center">
      <div className="mb-10 text-60 font-bold text-white">로그인</div>
      <ClientProvider>
        <LoginFormContainer />
      </ClientProvider>
    </div>
  );
}
