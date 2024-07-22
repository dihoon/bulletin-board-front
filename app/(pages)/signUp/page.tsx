import ClientProvider from '@/components/ClientProvider';
import SignUpFormContainer from '@/containers/SignUpFormContainer';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <>
      <Image
        className="brightness-50 filter"
        src="/images/tree.jpg"
        alt="배경화면"
        fill
        objectFit="cover"
      />
      <div className="relative flex h-lvh flex-col items-center justify-center">
        <div className="mb-10 text-60 font-bold text-white">회원가입</div>
        <ClientProvider>
          <SignUpFormContainer />
        </ClientProvider>
      </div>
    </>
  );
}
