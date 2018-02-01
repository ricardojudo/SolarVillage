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
	
	@Test
	public void testGetDeadLine() throws ParseException{
		String date = "2012-11-12";
		hoaMeeting.setDate(date);
		Date deadLine = hoaMeeting.getDeadLine();
		Calendar calendar = Calendar.getInstance() ;
		calendar.setTime(deadLine);
		assertEquals(calendar.get(Calendar.DAY_OF_MONTH),5);
		assertEquals(calendar.get(Calendar.MONTH),Calendar.NOVEMBER);
		assertEquals(calendar.get(Calendar.YEAR),2012);
	}
	
	@Test
	public void testGetDeadLineInDays(){
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.HOUR, 720);
		hoaMeeting.setDate(calendar.getTime());
		
		int days = hoaMeeting.getDaysForDeadLine();
		assertEquals(days, 23);
		
	}
	
}
