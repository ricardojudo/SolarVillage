package ricardojudo.solar_village.domain;

import static org.testng.AssertJUnit.assertEquals;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;
import static org.testng.Assert.assertFalse;

import java.text.ParseException;
import java.util.Date;

import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import ricardojudo.solar_village.domain.PermitRequest.PermitType;
import ricardojudo.solar_village.domain.PermitRequest.Status;

public class NewOrderTest {

	private NewOrder newOrder;
	
	@BeforeTest
	public void beforeTest() {
		newOrder = NewOrder.getInstance();
	}
//Factory methods
	@Test
	public void getCondominiumInstanceTest() {
		newOrder=NewOrder.getCondominiumInstance(new Date());
		assertNotNull(newOrder.getId());
		assertNotNull(newOrder.getHoaMeeting());
	}
	@Test
	public void getCondominiumInstanceTest_StringDate() throws ParseException {
		newOrder=NewOrder.getCondominiumInstance("2018-10-12");
		assertNotNull(newOrder.getId());
		assertNotNull(newOrder.getHoaMeeting());
	}
	@Test
	public void getInstanceTest() {
		assertNotNull(newOrder.getId());
	}

	//Approval
	@Test
	public void isApproved_Condo() throws ParseException {
		newOrder=NewOrder.getCondominiumInstance("2018-10-12");
		newOrder.approvedByHoa();
		assertTrue(newOrder.isApprovedByHoa());
		
		
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		
		newOrder.complete();
		assertTrue(newOrder.isApproved());
	}
	
	@Test
	public void isNotApproved_Condo() throws ParseException {
		newOrder=NewOrder.getCondominiumInstance("2018-10-12");
		assertFalse(newOrder.isApprovedByHoa());
		
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		
		newOrder.complete();
		assertFalse(newOrder.isApproved());
	}
	@Test
	public void isNoApproved2_Condo() throws ParseException {
		newOrder=NewOrder.getCondominiumInstance("2018-10-12");
		newOrder.approvedByHoa();
		
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(false, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		
		newOrder.complete();
		assertFalse(newOrder.isApproved());
	}
		
	
	@Test
	public void isApproved_NoCondo() {
		newOrder=NewOrder.getInstance();
		
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		newOrder.complete();
		assertTrue(newOrder.isCompleted());
		assertTrue(newOrder.isApproved());
	}
	
	
	@Test
	public void isNotApproved1_NoCondo() {
		newOrder=NewOrder.getInstance();
		
		newOrder.add(buildPermit(false, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		
		newOrder.complete();
		assertTrue(newOrder.isCompleted());
		assertFalse(newOrder.isApproved());
	}
	
	@Test
	public void isNotApproved2_NoCondo() {
		newOrder=NewOrder.getInstance();
		
		newOrder.add(buildPermit(true, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(false, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		
		newOrder.complete();
		assertTrue(newOrder.isCompleted());
		assertFalse(newOrder.isApproved());
	}
	
	@Test
	public void isNotApproved3_NoCondo() {
		newOrder=NewOrder.getInstance();
		
		newOrder.add(buildPermit(false, PermitType.RESIDENTIAL_ELECTRIC));
		newOrder.add(buildPermit(false, PermitType.RESIDENTIAL_STRUCTURAL));
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		
		
		newOrder.complete();
		assertTrue(newOrder.isCompleted());
		assertFalse(newOrder.isApproved());
	}
	
	//Build Permits
	@Test 
	public void buildElectricPermitTest(){
		newOrder = NewOrder.getInstance();
		
		PermitRequest permitRequest = newOrder.buildPermitRequest(PermitRequest.PermitType.RESIDENTIAL_ELECTRIC);
		
		assertNotNull(permitRequest);
		assertEquals(permitRequest.getAddress(), newOrder.getAddress());
		assertEquals(permitRequest.getPermitType(), PermitRequest.PermitType.RESIDENTIAL_ELECTRIC);
		
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		assertTrue(newOrder.getGovermentPermits().contains(permitRequest));
		
	}
	
	@Test 
	public void buildStructuralPermitTest(){
		newOrder = NewOrder.getInstance();
		
		PermitRequest permitRequest = newOrder.buildPermitRequest(PermitRequest.PermitType.RESIDENTIAL_STRUCTURAL);
		
		assertNotNull(permitRequest);
		assertEquals(permitRequest.getAddress(), newOrder.getAddress());
		assertEquals(permitRequest.getPermitType(), PermitRequest.PermitType.RESIDENTIAL_STRUCTURAL);
		
		assertFalse(newOrder.getGovermentPermits().isEmpty());
		assertTrue(newOrder.getGovermentPermits().contains(permitRequest));
		
	}
	
	
	//States
	@Test
	public void isNew() {
		newOrder = NewOrder.getInstance();
		assertEquals(newOrder.getStatus(), NewOrder.Status.NEW);
		assertTrue(newOrder.isNew());
	}

	
	
	
	private PermitRequest buildPermit(boolean b, PermitType type) {
		PermitRequest permitRequest= new PermitRequest();
		permitRequest.setStatus(b ? Status.APPROVED :  Status.DENIED);
		permitRequest.setPermitType(type);
		return permitRequest;
	}
	
}
