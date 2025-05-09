export const LoadingSpinner = () => {
  return (
    <div
      className='flex items-center justify-center min-h-screen'
      aria-label='콘텐츠를 불러오는 중입니다'
    >
      <div
        className='h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent'
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};
