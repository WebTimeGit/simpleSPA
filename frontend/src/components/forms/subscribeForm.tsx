import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAuthContext} from "@/context/authContext";
import {api} from "@/services/axios";
import {API} from "@/services/api/api";
import useSWR from "swr";

type FormData = {
	email: string
	username: string
}

export const SubscribeForm = () => {
	const {userData} = useAuthContext()

	const [formData, setFormData] = useState<FormData>({
		email: '',
		username: userData?.username ?? "-"
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target

		setFormData(prevState => ({...prevState, [name]: value}))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			const response = await api.post(API.subscribe, formData)
			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}


	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto my-10">
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<button type="submit"
			        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
				Subscribe
			</button>
		</form>
	)
}
