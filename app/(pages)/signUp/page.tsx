import ClientProvider from '@/components/ClientProvider';
import SignUpFormContainer from '@/containers/SignUpFormContainer';

export default function SignUpPage() {
  return (
    <div className="flex h-lvh flex-col items-center justify-center">
      <div className="mb-10 text-60 font-bold text-white">회원가입</div>
      <ClientProvider>
        <SignUpFormContainer />
      </ClientProvider>
    </div>
  );
}
