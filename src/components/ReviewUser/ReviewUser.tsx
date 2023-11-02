import React, { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { Rating } from "@mui/material";
import router, { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {};

const ReviewUser = (props: Props) => {
  const { data: userSession } = useSession();
  const [isReviewing, setReviewing] = useState(false);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { code } = router.query;
  const handleRatingChange = (
    event: ChangeEvent<{}>,
    newValue: number | null
  ) => {
    // Actualiza el estado 'rating' cuando el usuario selecciona una calificación
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  const startReview = () => {
    setReviewing(true);
  };

  const cancelReview = () => {
    setReviewing(false);
    setRating(0);
    setComment("");
  };

  // maquetado de comentarios

  const saveReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userSession?.user.id,
          description: comment,
          rating: rating,
        }),
      });

      if (response.ok) {
        // El comentario se guardó exitosamente
        toast.success("Comentario guardado exitosamente");
        cancelReview(); // Limpia el estado del formulario
      } else {
        // Si la solicitud no fue exitosa, muestra un mensaje de error
        toast.error("Error al guardar el comentario");
        console.error("Error al guardar el comentario");
      }
    } catch (error) {
      // Si hay un error de red, muestra un mensaje de error
      toast.error("Error de red");
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col  border-2 w-full sm:w-[65%] lg:w-[45%] rounded-lg shadow-lg">
      {userSession ? (
        <div className="flex items-center justify-between pl-2">
          <div className=" flex items-center gap-2">
            <img
              src={userSession.user.image}
              alt={userSession.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="text-xl font-semibold">{userSession.user.name}</div>
          </div>

          {!isReviewing ? (
            <button
              onClick={startReview}
              className="bg-green-700 text-white p-1 rounded"
            >
              Realizar Comentario
            </button>
          ) : null}
        </div>
      ) : (
        <p>Debes estar autenticado para realizar una revisión.</p>
      )}
      {isReviewing ? (
        <div className=" rounded p-4 space-y-2  ">
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5} // Puedes ajustar la precisión de las estrellas según tus necesidades
          />
          <label className="block">
            Comentario:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block border p-2 rounded w-[100%] h-[15vh]"
            />
          </label>
          <div className="flex space-x-4">
            <button
              onClick={saveReview}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button
              onClick={cancelReview}
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewUser;
