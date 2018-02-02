package ricardojudo.solar_village.domain;
import static org.testng.Assert.assertEquals;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class HoaMeetingTest {
	private HoaMeeting hoaMeeting;

	@BeforeTest
	public void setUpBefore() {
		hoaMeeting = new HoaMeeting();
	}
	
	@Test
	public void testSetDate_String() throws ParseException{
		String date = "2012-11-12";
		hoaMeeting.setDate(date);
		Date hoaMeetingDate = hoaMeeting.getDate();
		Calendar calendar = Calendar.getInstance() ;
		calendar.setTime(hoaMeetingDate);
		assertEquals(12,calendar.get(Calendar.DAY_OF_MONTH));
		assertEquals(Calendar.NOVEMBER,calendar.get(Calendar.MONTH));
		assertEquals(2012,calendar.get(Calendar.YEAR));
	}
}
