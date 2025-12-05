"use client";

import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import SectionWrapper from "@/components/SectionWrapper";

export default function AboutPage() {
    return (
        <main className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen">
            <Header />
            {/* Hero */}
            <SectionWrapper className="text-center py-24 mt-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    About <span className="text-indigo-500 dark:text-indigo-400">CollabBoard</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                    Collaborate, brainstorm, and visualize your ideas in real-time. Our mission is to make teamwork intuitive, productive, and enjoyable.
                </p>
            </SectionWrapper>

            {/* Mission Section */}
            <SectionWrapper className="py-16 bg-white dark:bg-slate-800 rounded-3xl shadow-md">
                <SectionHeader
                    title="Our Mission"
                    subtitle="Empowering teams to collaborate seamlessly and creatively."
                    className="mb-12"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2">Real-Time Collaboration</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            Work together with your team in real-time with instant updates and feedback.
                        </p>
                    </div>
                    <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2">Visual Planning</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            Organize ideas, tasks, and projects visually for clarity and creativity.
                        </p>
                    </div>
                    <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2">AI-Assisted Creativity</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            Leverage AI suggestions to brainstorm faster and generate innovative solutions.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Team Section */}
            <SectionWrapper className="py-16">
                <SectionHeader
                    title="Meet the Team"
                    subtitle="The passionate minds building CollabBoard"
                    className="mb-12"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { name: "Harkaran Singh", role: "CEO & Founder" },
                        { name: "Bhoomi Gupta", role: "Lead Developer" },
                        { name: "Navpreet Singh", role: "Product Designer" },
                        { name: "Garvit Sharma", role: "AI Specialist" },
                    ].map((member) => (
                        <div
                            key={member.name}
                            className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow hover:shadow-xl transition"
                        >
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-500 dark:bg-indigo-400 flex items-center justify-center text-white text-2xl font-bold">
                                {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <h4 className="text-lg font-semibold">{member.name}</h4>
                            <p className="text-slate-600 dark:text-slate-300">{member.role}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Why Choose Us Section */}
            <SectionWrapper className="py-16 bg-white dark:bg-slate-800 rounded-3xl shadow-md">
                <SectionHeader
                    title="Why Choose CollabBoard?"
                    subtitle="Everything you need to collaborate, organize, and create efficiently."
                    className="mb-12"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        {
                            title: "Intuitive Interface",
                            description:
                                "A clean, user-friendly interface that makes collaboration simple and fun.",
                        },
                        {
                            title: "Flexible Workflows",
                            description:
                                "Adapt CollabBoard to your team’s unique workflow with customizable boards and templates.",
                        },
                        {
                            title: "Secure & Reliable",
                            description:
                                "Enterprise-grade security and reliability for your projects and data.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-xl transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
