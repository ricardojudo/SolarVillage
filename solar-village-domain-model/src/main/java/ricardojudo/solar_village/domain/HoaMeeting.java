package ricardojudo.solar_village.domain;

import java.io.Serializable;
import java.util.Date;

public class HoaMeeting implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9205144590328238995L;
	
	private Date date;
	
	private Boolean approved;
	
	private String attendant;
	
	private String attendantDeparment;

	public void setDate(Date date) {
		this.date = date;
	}
	
	public Date getDate() {
		return date;
	}
	
	public Boolean getApproved() {
		return approved;
	}

	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	public String getAttendant() {
		return attendant;
	}

	public void setAttendant(String attendant) {
		this.attendant = attendant;
	}

	public String getAttendantDeparment() {
		return attendantDeparment;
	}

	public void setAttendantDeparment(String attendantDeparment) {
		this.attendantDeparment = attendantDeparment;
	}

	@Override
	public String toString() {
		return "HoaMeeting [approved=" + approved + ", attendant=" + attendant
				+ ", attendantDeparment=" + attendantDeparment + "]";
	}
	
	

}
