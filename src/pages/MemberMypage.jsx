import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberSidebar from "../components/membermypage/MemberSidebar";
import MemberMypageBody from "../components/membermypage/MemberMypageBody";

export default function MemberMypage() {
    const [activeMenu, setActiveMenu] = useState("profile");

    const renderBody = () => {
        switch (activeMenu) {
            case "resume":
                return <ResumeSection />;
            case "scrap":
                return <ScrapSection />;
            case "profile":
            default:
                return <MemberMypageBody />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
            <Header />

            <main className="flex-grow">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        <MemberSidebar
                            activeMenu={activeMenu}
                            onChangeMenu={setActiveMenu}
                        />

                        <section className="flex-1">
                            {renderBody()}
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}