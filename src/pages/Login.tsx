import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Auth from "../apis/Auth";

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      await Auth(data);
      navigate("/dogs");
    } catch (error) {
      setError("root", {
        message: "Authentication failed.",
      });
    }
  };

  return (
    <div className="flex flex-wrap flex-col justify-center p-8 h-screen items-center">
      <h1 className="p-10 text-9xl font-doggy">Login</h1>      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2">
          <input {...register("name")} className="p-2 text-black bg-white border border-solid rounded-sm" type="text" placeholder="Name" />
          {errors.name && <div className="text-red-600">{errors.name.message}</div>}
        </div>
        <div className="pb-2">
          <input {...register("email")} className="p-2 text-black bg-white border border-solid rounded-sm" type="email" placeholder="Email" />
          {errors.email && <div className="text-red-600">{errors.email.message}</div>}
        </div>
        <div className="justify-self-center pt-4">
          <button type="submit">Sign In</button>
        </div>
        {errors.root && <span>{errors.root.message}</span>}
      </form>
      </div>
  );
};

export default Login;
