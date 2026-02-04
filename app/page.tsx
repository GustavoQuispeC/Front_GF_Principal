'use client';

import {Button} from "@heroui/react";

export default function Home() {
 
  return (
    <section className="flex flex-col items-center justify-center gap-1 py-1 md:py-2">
      
      <div className="bg-gradient-to-b from-white via-sky-50 to-purple-50">
      

      <div className="px-4 sm:px-10 py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 justify-center items-center gap-x-12 gap-y-16">
            <div>
              <div className="max-w-3xl max-lg:mx-auto max-lg:text-center">
                <p className="mb-2 font-medium text-indigo-600  uppercase"><span
                  className="rotate-90 inline-block mr-2">|</span> app that help your business grow</p>
                <h1 className="text-slate-900 md:text-5xl text-4xl font-bold !leading-tight">Simple Solutions for Complex Problems
                </h1>
                <p className="text-slate-600 text-base leading-relaxed mt-6">Our intuitive platform streamlines every aspect of your business operations.
                  Effortlessly manage projects, track inventory, and automate workflows, Connect meaningfully with customers through.</p>

                <div className="mt-12 flex flex-wrap gap-6 max-lg:justify-center">
                  <button type='button'
                    className="bg-indigo-600 hover:bg-indigo-700 border border-indigo-700 transition-all text-base text-white font-medium rounded-lg px-6 py-3 cursor-pointer outline-0">Get Started Free</button>
                  <button type='button'
                    className="bg-transparent hover:border-indigo-700 border border-gray-400 transition-all text-base text-slate-900 font-medium rounded-lg px-6 py-3 cursor-pointer outline-0">Integrations</button>
                </div>
              </div>

              <div className="flex items-center flex-wrap max-lg:justify-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://readymadeui.com/team-1.webp" alt="img-1" />
                  <img className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://readymadeui.com/team-2.webp" alt="img-2" />
                  <img className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://readymadeui.com/team-3.webp" alt="img-3" />
                </div>
                <div className="text-slate-600 text-base">
                  <span className="font-semibold">Over 10,000</span> Professionals trust us
                </div>
              </div>
            </div>

            <div className="w-full aspect-[42/33]">
              <img src="https://readymadeui.com/images/mobile-app-img-5.webp" alt="banner img"
                className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </section>
  );
}
