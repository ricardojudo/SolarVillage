package ricardojudo.solar_village.domain;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class HoaMeeting implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9205144590328238995L;

	private Date date;

	private boolean approved;

	private String attendant;

	private String attendantDeparment;

	private Date deadLine;

	public static final int DEADLINE_IN_DAYS = 7;
	public static final int DEADLINE_IN_HOURS;
	static {
		DEADLINE_IN_HOURS = 24 * DEADLINE_IN_DAYS;
	};

	public void setDate(Date date) {
		this.date = date;
		
		/*Calculating deadline date - 7 days*/
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR, -DEADLINE_IN_HOURS);
		setDeadLine(calendar.getTime());	
	}

	public void setDate(String date) throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		setDate(dateFormat.parse(date));
	}

	public Date getDate() {
		return date;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
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

	public Date getDeadLine() {
		return deadLine;
	}

	protected void setDeadLine(Date deadLine) {
		this.deadLine = deadLine;
	}

	protected void setDaysForDeadLine(int deadLineInDays) {
		throw new UnsupportedOperationException();
	}
	
	public int getDaysForDeadLine() {
		long current = new Date().getTime();
		long deadline = deadLine.getTime();
		long daysForDeadLine = deadline - current;
		int days = (int)TimeUnit.DAYS.convert(daysForDeadLine, TimeUnit.MILLISECONDS);
		return days;
	}

}
