import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold animate-pulse">
            🚀 10 მარტს ვიწებთ ჯავასკრიპტის მოდულს!
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter">
            CODE<span className="text-blue-500">IT</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
            "CodeIT ტექნოპარკის პროექტია, რომელიც საქართველოს ინოვაციებისა და ტექნოლოგიების სააგენტოს, 
            საქართველოს ბანკისა და ლინეიტის მხარდაჭერით მიმდინარეობს."
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25">
                რეგისტრაცია
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-black transition-all border border-slate-700">
                LOGIN
              </button>
            </SignInButton>
          </div>
        </div>

        {/* სასწავლო მოდულები */}
        <div className="mt-32 space-y-12">
            <h2 className="text-4xl font-black text-white tracking-tight text-center">სასწავლო <span className="text-blue-500">მოდულები</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
                {/* მოდული 1 */}
                <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition-all">
                    <img src="https://placehold.co/600x400?text=HTML5+%26+CSS3" alt="Module 1 Placeholder" className="rounded-2xl mb-6 shadow-md"/>
                    <h3 className="text-2xl font-bold text-white mb-2">მოდული 1: HTML, CSS</h3>
                    <p className="text-slate-300">ისწავლე ვებგვერდების სტრუქტურირება და სტილიზაცია საფუძვლიანად.</p>
                </div>
                {/* მოდული 2 */}
                <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition-all">
                    <img src="https://placehold.co/600x400?text=JavaScript+Module" alt="Module 2 Placeholder" className="rounded-2xl mb-6 shadow-md"/>
                    <h3 className="text-2xl font-bold text-white mb-2">მოდული 2: JavaScript</h3>
                    <p className="text-slate-300">გაეცანი პროგრამირების ლოგიკას და ინტერაქტიული ვებგვერდების შექმნას.</p>
                </div>
                {/* მოდული 3 */}
                <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition-all">
                    <img src="https://placehold.co/600x400?text=React+%26+Next.js" alt="Module 3 Placeholder" className="rounded-2xl mb-6 shadow-md"/>
                    <h3 className="text-2xl font-bold text-white mb-2">მოდული 3: React, Next.js</h3>
                    <p className="text-slate-300">შექმენი მასშტაბური და სწრაფი ვებ-აპლიკაციები თანამედროვე ფრეიმვორკებით.</p>
                </div>
            </div>
        </div>
        {/* ლექტორები და ასისტენტები */}
        <div className="mt-32 space-y-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight text-center">
              ჩვენი <span className="text-blue-500">გუნდი</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                
                {/* შიო ზამურაშვილი */}
                <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 text-center space-y-4 hover:border-blue-500/50 hover:bg-[#1e293b]/80 transition-all duration-300 group shadow-xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <img 
                          src="/shio.jpg" 
                          alt="შიო ზამურაშვილი" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <h4 className="font-bold text-white text-xl md:text-2xl">შიო ზამურაშვილი</h4>
                    <p className="font-bold text-blue-400 text-base">მთავარი ლექტორი</p>
                </div>

                {/* ცოტნე შონია */}
                <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 text-center space-y-4 hover:border-slate-500/50 hover:bg-[#1e293b]/80 transition-all duration-300 group shadow-xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-600 group-hover:border-slate-400 transition-colors duration-300">
                        <img 
                          src="/tsotne.jpg" 
                          alt="ცოტნე შონია" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <h4 className="font-bold text-white text-xl md:text-2xl">ცოტნე შონია</h4>
                    <p className="font-medium text-slate-400 text-base">ლექტორის ასისტენტი</p>
                </div>

                {/* ნიკოლოზ ოსიევი */}
                <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 text-center space-y-4 hover:border-slate-500/50 hover:bg-[#1e293b]/80 transition-all duration-300 group shadow-xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-600 group-hover:border-slate-400 transition-colors duration-300">
                        <img 
                          src="/nika.jpg" 
                          alt="ნიკოლოზ ოსიევი" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <h4 className="font-bold text-white text-xl md:text-2xl">ნიკოლოზ ოსიევი</h4>
                    <p className="font-medium text-slate-400 text-base">ლექტორის ასისტენტი</p>
                </div>

            </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-32">
          <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800">
            <h3 className="text-blue-500 font-bold mb-2">🕒 დრო და განრიგი</h3>
            <p className="text-slate-300">სამშაბათი, ხუთშაბათი: 16:00-17:30</p>
          </div>
          <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800">
            <h3 className="text-blue-500 font-bold mb-2">👶 ასაკობრივი ზღვარი</h3>
            <p className="text-slate-300">14-18 წელი</p>
          </div>
          <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 md:col-span-2 lg:col-span-1">
            <h3 className="text-blue-500 font-bold mb-2">🤝 მხარდამჭერები</h3>
            <p className="text-slate-300 text-sm">GITA • Bank of Georgia • Lineate • DoIT in Georgia</p>
          </div>
        </div>
      </main>
    </div>
  );
}