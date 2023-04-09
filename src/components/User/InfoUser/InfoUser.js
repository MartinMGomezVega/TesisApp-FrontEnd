import React from 'react';
import moment from 'moment/moment'; // Formatear las fechas
import localization from "moment/locale/es";
import { Location, Link, DateBirth} from "../../../utils/Icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
    const { user } = props;
    return (
      <div className='info-user'>
          {/* Nombre y apellido */}
          <h2 className='name'>
              {user?.name} {user?.surname}
          </h2>
          
          {/* Email */}
          <p className='email'>{user?.email}</p>

          {/* Biografia */}
          {user?.biography && (<div className='description'>{user.biography}</div>)}

          <div className="more-info">
            {/* Ubicacion */}
            <div className=''>
              {user?.location && (
                <p>
                  <Location/>
                  {user.location}
                </p>
              )}
            </div>

            {/* Sitio web */}
            {user?.webSite && (
                <a href={user.webSite} alt={user.webSite} target="_blank" rel='noopener noreferrer'>
                  <Link />
                  {user.webSite}
                </a>
            )}
            {user?.dateOfBirth && (
              <p>
                <DateBirth />
                {moment(user.dateOfBirth).locale("es", localization).format("LL")}
              </p>
            )}
          </div>
      </div>
    );
}
