import { Box, TextField, FormControlLabel, CheckboxProps, Checkbox } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CheckIcon from '@mui/icons-material/Check';

const CustomCheckbox = (props: CheckboxProps) => (
    <Checkbox
        {...props}
        size="small"
        icon={
            <span
                style={{
                    width: 18,
                    height: 18,
                    border: "2px solid #000",
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    display: "inline-block",
                }}
            />
        }
        checkedIcon={
            <span
                style={{
                    width: 18,
                    height: 18,
                    border: "2px solid #000",
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CheckIcon style={{ fontSize: 16, color: "#000" }} />
            </span>
        }
        sx={{ padding: 0, marginRight: 1 }}
        defaultChecked
    />
);

const Form = () => {
    const [check, setCheck] = useState(true);
    const router = useRouter();

    const handleSignInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCheck(false);

    };

    const handleSignUpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCheck(true);

    };

    const gotoPersonal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push('/personal-details');
    }

    return (
        <Box className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 flex flex-col px-4 md:px-10 py-8 md:py-12">
            <div className="font-inter font-bold text-[2rem] md:text-[2.375rem] leading-[1.25] text-[#1C2927] mb-2 text-center">
                {check ? "Sign Up" : "Sign in"}
            </div>
            <div className="font-inter font-normal text-[1rem] md:text-[1.125rem] leading-[1.6875rem] text-[#1C2927] mb-8 text-center">
                {check ? "Create your Falcon Account" : "Access to your Falcon Account"}
            </div>
            <div className="flex gap-4 mb-6">
                <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center">
                    <Image src="/images/apple.png" alt="Apple" width={28} height={28} />
                </button>
                <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center">
                    <Image src="/images/google.png" alt="Google" width={28} height={28} />
                </button>
            </div>
            <div className="flex items-center mb-6">
                <div className="flex-1 h-px bg-[#E0E0E0]" />
                <span className="mx-4 text-[#1C2927] text-sm">{check?"or sign up with email":"or sign in with email"}</span>
                <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>
            <label htmlFor="email" className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2 text-[#000000]">
                Email Id
            </label>
            <TextField
                id="email"
                placeholder="Enter Your Email"
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <span className="pl-2 pr-2">
                            <Image src="/images/person_filled.png" alt="Person" width={32.42} height={27.53} />
                        </span>
                    ),
                    style: {
                        borderRadius: "0.375rem",
                        height: "3.66rem",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: "1rem",
                        borderColor: "#D9D9D9",
                        background: "#F8F9FA",
                    },
                }}
                sx={{
                    width: "100%",
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "0.375rem",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: "1rem",
                        background: "#F8F9FA",
                        "& fieldset": {
                            borderColor: "#D9D9D9",
                        },
                        "&:hover fieldset": {
                            borderColor: "#345794",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#345794",
                        },
                    },
                }}
            />
            <label htmlFor="password" className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2 text-[#000000]">
                Password
            </label>
            <TextField
                id="password"
                placeholder="Enter Your Password"
                variant="outlined"
                type="password"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <span className="pl-2 pr-2">
                            <Image src="/images/lock.png" alt="Person" width={18} height={24} />
                        </span>
                    ),
                    endAdornment: (
                        <span className="pr-2 cursor-pointer">
                            <Image src="/images/visibility.png" alt="Person" width={25} height={17} />
                        </span>
                    ),
                    style: {
                        borderRadius: "0.375rem",
                        height: "3.66rem",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: "1rem",
                        borderColor: "#D9D9D9",
                        background: "#F8F9FA",
                    },
                }}
                sx={{
                    width: "100%",
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "0.375rem",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: "1rem",
                        background: "#F8F9FA",
                        "& fieldset": {
                            borderColor: "#D9D9D9",
                        },
                        "&:hover fieldset": {
                            borderColor: "#345794",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#345794",
                        },
                    },
                }}
            />
            {!check && (
                <div className="flex items-center justify-between mb-6 ml-4">
                    <FormControlLabel
                        control={<CustomCheckbox />}
                        label={
                            <span className="font-inter font-normal text-[18px] leading-[27px] text-[#1C2927]">
                                Keep me Logged in
                            </span>
                        }
                    />
                    <a href="#" className="font-inter text-sm text-[#345794] hover:underline">Forgot Password?</a>
                </div>
            )}
            <button
                type="submit"
                className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition mb-4 cursor-pointer"
                style={{
                    background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
                }} onClick={gotoPersonal}
            >
                {check ? "Sign Up" : "Login"}
            </button>
            <div className="text-center mt-2">
                {check ? (
                    <span className="font-inter text-[1rem]">Already have an account?{' '}
                        <a href="/login" className="text-[#345794] font-bold hover:underline" onClick={handleSignInClick}>Sign in</a>
                    </span>
                ) : (
                    <span className="font-inter text-[1rem]">New Here?{' '}
                        <a href="/signup" className="text-[#345794] font-bold hover:underline" onClick={handleSignUpClick}>Sign Up</a> For free
                    </span>
                )}
            </div>
            <div className="mt-24 md:mt-28 flex justify-end">
                <span className="font-inter font-normal text-[18px] leading-[27px] text-[#1C2927] w-full h-full flex items-center justify-center">
                    Copyright © 2025 Falcon. All rights reserved
                </span>
            </div>
        </Box>
    )
}

export default Form;