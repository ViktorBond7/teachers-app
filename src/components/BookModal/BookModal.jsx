import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./BookModal.module.css";
import IconSvg from "../IconSvg";
import { toast, ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone must be a number")
    .required("Phone number is required"),
});

const BookModal = ({ teacher, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBackdropClick = (event) => {
    // event.stopPropagation();
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const onSubmit = (data) => {
    toast.info("You booked a trial lesson");
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
          <IconSvg
            iconName="icon-x"
            width="32"
            height="32"
            className={css.icon}
          />
        </button>
        <h2>Book trial lesson</h2>
        <p className={css.pageExperienced}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.imgContent}>
          {" "}
          <img
            className={css.teacherImg}
            src={teacher.avatar_url}
            alt={teacher.name}
          />
          <div className={css.pageName}>
            <span>Your teacher</span>
            <p>{`${teacher.name} ${teacher.surname}`}</p>
          </div>
        </div>

        <h3>What is your main reason for learning English?</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.contRadio}>
            <label>
              <input
                type="radio"
                {...register("reason")}
                value="Career and business"
              />
              Career and business
            </label>

            <label>
              <input
                type="radio"
                {...register("reason")}
                value="Lesson for kids"
              />
              Lesson for kids
            </label>
            <label>
              <input
                type="radio"
                {...register("reason")}
                value="Living abroad"
              />
              Living abroad
            </label>
            <label>
              <input
                type="radio"
                {...register("reason")}
                value="Exams and coursework"
              />
              Exams and coursework
            </label>
            <label>
              <input
                type="radio"
                {...register("reason")}
                value="Culture, travel or hobby"
              />
              Culture, travel or hobby
            </label>
          </div>
          {errors.reason && (
            <p className={css.error}>{errors.reason.message}</p>
          )}

          <div className={css.containerInfo}>
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className={css.input}
            />
            {errors.fullName && (
              <p className={css.error}>{errors.fullName.message}</p>
            )}

            <input
              {...register("email")}
              placeholder="Email"
              className={css.input}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}

            <input
              {...register("phone")}
              placeholder="Phone number"
              className={css.input}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>
          <button type="submit" className={css.submit}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
