// src/app/test-image/page.tsx
export default function TestImagePage() {
  return (
    <div className="min-h-screen p-10 bg-background">
      <h1 className="text-3xl mb-8">Тест загрузки картинок</h1>
      
      <h2 className="text-xl mb-4">1. Picsum Photos:</h2>
      <img 
        src="https://picsum.photos/400/300" 
        alt="Test" 
        className="border-4 border-red-500"
      />
      
      <h2 className="text-xl mb-4 mt-8">2. Placeholder:</h2>
      <img 
        src="https://via.placeholder.com/400x300.png?text=HELLO" 
        alt="Test" 
        className="border-4 border-blue-500"
      />
      
      <h2 className="text-xl mb-4 mt-8">3. Emoji вместо картинки:</h2>
      <div className="w-64 h-64 bg-green-200 flex items-center justify-center text-6xl border-4 border-green-500">
        🏔️
      </div>
    </div>
  );
}