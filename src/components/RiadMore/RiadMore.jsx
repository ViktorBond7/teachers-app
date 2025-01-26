import { VscAccount } from "react-icons/vsc";
import { useOutletContext } from "react-router-dom";
import IconSvg from "../IconSvg";
import css from "./RiadMore.module.css";
import { formatRating } from "../utils/formatRating";

const RiadMore = () => {
  const { teacher } = useOutletContext();
  const reviews = teacher?.reviews || [];

  return (
    <ul>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        teacher.reviews.map((review, index) => (
          <li className={css.list} key={index}>
            <p>{review.experience}</p>
            <div className={css.container}>
              <VscAccount size="44" />

              <div className={css.pageContainer}>
                <p className={css.pageName}>{review.reviewer_name}</p>
                <p className={css.page}>
                  {" "}
                  <IconSvg
                    iconName="icon-star"
                    width="16"
                    height="16"
                    className={css.icon}
                  />
                  {`${formatRating(review.reviewer_rating)}`}
                </p>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default RiadMore;
