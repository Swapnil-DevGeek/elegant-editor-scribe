import RichTextEditor from "@/components/RichTextEditor";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Rich Text Editor</h1>
        <RichTextEditor 
          onChange={(content) => {
            console.log('Content updated:', content);
          }}
        />
      </div>
    </div>
  );
};

export default Index;