import Input from "@/components/Input";
import { createClient } from "@/utils/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const supabase = createClient();

export default function Admin() {
    const router = useRouter(); // Use Next.js router for navigation. (Next.js 라우터를 사용해 페이지를 탐색합니다.)
    const [userResponse, setUserResponse] = useState<UserResponse>(); // State to store the current user response. (현재 사용자 응답을 저장하는 상태입니다.)
    const emailRef = useRef<HTMLInputElement>(null); // Reference for the email input field. (이메일 입력 필드에 대한 참조입니다.)
    const passwordRef = useRef<HTMLInputElement>(null); // Reference for the password input field. (비밀번호 입력 필드에 대한 참조입니다.)

    // Handle form submission for login.)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior. (기본 폼 제출 동작을 방지합니다.)
        const response = await supabase.auth.signInWithPassword({
            email: emailRef.current?.value ?? "", // Get email from the input reference. (입력 참조에서 이메일을 가져옵니다.)
            password: passwordRef.current?.value ?? "", // Get password from the input reference. (입력 참조에서 비밀번호를 가져옵니다.)
        });

        // If the login fails, show an alert. (로그인이 실패하면 알림을 표시합니다.)
        if (!response.data.user) {
            return alert("Login failed.");
        }

        // Refresh the router to reflect the login state. (로그인 상태를 반영하기 위해 라우터를 새로 고칩니다.)
        router.refresh();
    };

    // Fetch the current user on component mount. (컴포넌트가 마운트될 때 현재 사용자를 가져옵니다.)
    useEffect(() => {
        (async () => {
            const user = await supabase.auth.getUser(); // Get the logged-in user. (로그인된 사용자를 가져옵니다.)
            setUserResponse(user); // Update the state with the user response. (사용자 응답으로 상태를 업데이트합니다.)
        })();
    }, []);

    return (
        // Main container for the admin page. (관리자 페이지의 메인 컨테이너입니다.)
        <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
            {!!userResponse?.data.user ? (
                // Render this section if the user is logged in. (사용자가 로그인된 경우 이 섹션을 렌더링합니다.)
                <div className="flex flex-col gap-2">
                    {/* Display the logged-in user's email. (로그인된 사용자의 이메일을 표시합니다.) */}
                    <div className="mb-8">
                        <b>{userResponse.data.user.email}</b> is logged in.
                    </div>

                    {/* Button to navigate to the post creation page. (글 작성 페이지로 이동하는 버튼입니다.) */}
                    <button
                        type="button"
                        className="w-full rounded-md bg-gray-800 py-2 text-white"
                        onClick={() => router.push("/write")}
                    >
                        Create Post
                    </button>

                    {/* Button to log out and navigate to the home page. (로그아웃하고 홈 페이지로 이동하는 버튼입니다.) */}
                    <button
                        type="button"
                        className="w-full rounded-md bg-gray-800 py-2 text-white"
                        onClick={() => {
                            supabase.auth.signOut(); // Log out the user. (사용자를 로그아웃합니다.)
                            router.push("/"); // Redirect to the home page. (홈 페이지로 리다이렉트합니다.)
                        }}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                // Render this section if the user is not logged in. (사용자가 로그인하지 않은 경우 이 섹션을 렌더링합니다.)
                <div className="flex flex-col gap-8">
                    {/* Page title for the login form. */}
                    <h1 className="text-2xl font-medium">Admin Login</h1>
                    {/* Login form.  */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3">
                            {/* Input field for the email. (이메일 입력 필드.) */}
                            <Input
                                type="text"
                                placeholder="Email"
                                ref={emailRef}
                            />
                            {/* Input field for the password. (비밀번호 입력 필드.) */}
                            <Input
                                type="password"
                                placeholder="Password"
                                ref={passwordRef}
                            />
                        </div>
                        {/* Submit button for the login form. (로그인 폼의 제출 버튼.) */}
                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white"
                        >
                            Login
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
