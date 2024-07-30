import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { userAtom, selectedEventAtom } from "../../context/atoms";
import getUserDatils from "../../utils/getUserDetailsUtils";
import {
  getAllGuests,
  getGuestsOfEvent,
  getOneEvent,
  sendInvitationByEvent,
} from "../../services/";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import CreateGuestForm from "./CreateGuestForm";
import GuestList from "./GuestList";
import { useNavigate } from "react-router-dom";
import { closeIcon, dateFormat } from "../../utils";
import { EventType } from "../../types";
import Modal from "./modal/Modal";
import { toast } from "sonner";
import Loading from "../Loading";

const EventDetails = () => {
  const [user] = useAtom(userAtom);
  const [, setSelectEvent] = useAtom(selectedEventAtom);
  const { id } = getUserDatils(user);
  const [event, setEvent] = useState<EventType>();
  const [guestByEvent, setGuestByEvent] = useState([]);
  const [isOpenCreateGuest, setIsOpenCreateGuest] = useState<boolean>(false);
  const [, setIsOpenGuestList] = useState<boolean>(false);
  const navigate = useNavigate();

  const { eventId } = useParams();

  // const { name, date, time, location } = event as EventType; //destructuring  event

  const getEvent = async () => {
    const response = await getOneEvent(id, eventId);
    if (response.success) {
      setEvent(response.data);
      getAllGuestsOfEvent(eventId || "");
    } else toast.error(`${response.error} al obtener el evento`);
  };

  const getAllGuestsOfEvent = async (eventId: string) => {
    const response = await getGuestsOfEvent(eventId);

    if (response.success) setGuestByEvent(response.data.guests);
  };

  const sendAllInvitations = async () => {
    if (eventId) {
      const response = await sendInvitationByEvent(eventId);
      if (response.success) {
        toast.success("Invitaciones enviadas correctamente");
        getAllGuestsOfEvent(eventId);
      } else toast.error("Error al enviar las invitaciones");
    }
  };

  let invitationStatus = guestByEvent.reduce(
    (acc: any, guest: any) => {
      acc[guest.invitation_status] += 1;
      acc["all"] += 1;
      return acc;
    },
    { all: 0, sent: 0, accepted: 0, rejected: 0, notsent: 0 },
  );

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  console.log(guestByEvent);
  useEffect(() => {
    getEvent();
  }, []);

  if (!event) return <Loading />;

  return (
    <div>
      <Navbar openMenu={setIsOpenMenu} />

      <div className="degradado h-fit-content space-y-10 px-[100px] font-vietnam text-[#0D1512]">
        <div className="flex items-center justify-between pt-10">
          <h2 className="text-3xl font-semibold">Gestionar evento</h2>
          <button>
            <img src={closeIcon} alt="closeIcon" onClick={() => navigate(-1)} />
          </button>
        </div>

        <>
          <div className="fondo3 h-fit-content rounded-xl pb-2">
            <div className="flex flex-row p-6">
              <img
                className="h-[270px] w-[180px]"
                src={event.template_image || "../public/Jamie4.png"}
                alt=""
              />
              <div className="w-full ps-12 text-base">
                <h3 className="text-xl">{event.name}</h3>
                <p className="pt-8">{dateFormat(event.date)}</p>
                <p className="pt-1">Comienza: {event.time} hs</p>
                <p className="pt-8">{event.location}</p>
                <div className="my-10 space-x-5">
                  <button
                    onClick={() => setSelectEvent(event)}
                    className="boton h-[68px] w-[363px] rounded-xl px-4 py-4 text-xl transition-all hover:bg-orange-500"
                  >
                    Editar Invitación
                  </button>
                  <button className="text-xl underline decoration-1 transition-all hover:text-red-600">
                    Eliminar evento
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-8 mb-10 mt-4 rounded-xl border border-[#C2BAA6] px-3 py-6">
              {/* Línea opciones configuración invitación*/}
              <div className="flex justify-between text-xl">
                <button
                  className="pr-[200px] hover:text-gray-500"
                  onClick={() => setIsOpenGuestList(true)}
                >
                  <p>Invitaciones enviadas</p>
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={sendAllInvitations}
                    className="flex items-center hover:text-gray-500"
                  >
                    <img
                      className="h-[25px] w-[25px]"
                      src="../public/icons/SendEmail.png"
                      alt="send email"
                    />
                    <p className="ps-2">Enviar invitaciones</p>
                  </button>
                  <button
                    className="flex items-center hover:text-gray-500"
                    onClick={() => setIsOpenCreateGuest(true)}
                  >
                    <img
                      className="h-[40px] w-[40px]"
                      src="../public/icons/Multiply2.png"
                      alt="plus"
                    />
                    <p className="ps-2">Agregar Invitados</p>
                  </button>
                </div>
              </div>

              {/* estado de Invitados */}
              <div className="flex items-center justify-between py-5 text-lg text-[#0D1512]">
                <div className="flex space-x-2">
                  <span>Todos({invitationStatus.all})</span>
                  <span>Aceptados({invitationStatus.accepted})</span>
                  <span>Rechazados({invitationStatus.rejected})</span>
                  <span>Sin contestar({invitationStatus.sent})</span>
                  <span>Por enviar({invitationStatus.notsent})</span>
                </div>
              </div>

              {/* map Invitados */}

              <div>
                {guestByEvent.map((guest: any) => {
                  return (
                    <div
                      className="flex justify-between border-b-2 border-[#C2BAA6] py-5"
                      key={guest.guest_id}
                    >
                      <div>
                        <p className="text-xl">{guest.guest_fullname}</p>
                        <p className="pt-3">{guest.guest_email}</p>
                      </div>
                      <div className="flex items-center space-x-10 pr-5">
                        <button>
                          <img
                            className="h-[25px] w-[25px]"
                            src="../public/icons/Pencil.png"
                            alt="edit"
                          />
                        </button>
                        <button className="ms-10">
                          <img
                            className="h-[25px] w-[25px]"
                            src="../public/icons/Trash.png"
                            alt="delete"
                          />
                        </button>
                        <span className="font-semibold">
                          {guest.invitation_status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>

        <Modal
          isOpen={isOpenCreateGuest}
          onClose={() => setIsOpenCreateGuest(false)}
        >
          <div className="flex flex-col space-y-4">
            <CreateGuestForm
              event_id={eventId || ""}
              updateGuest={getAllGuestsOfEvent}
            />
            <GuestList event_id={eventId || ""} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EventDetails;
