package servlets;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <code>YUIReportViewer</code> is responsible for viewing the YUITest test results.
 * @author hazems
 *
 */
public class YUIReportViewer extends HttpServlet {
	private static final long serialVersionUID = -6710423876834091483L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String results = request.getParameter("results");
		String format = (request.getParameter("format") == null) ? "xml" : request.getParameter("format");		
		String reportName = (request.getParameter("reportName") == null) ? "report" : request.getParameter("reportName");
		
		// Generate the report result file under the reports folder...
		BufferedWriter out = null;
		
		String reportFullPath = getServletContext().getRealPath("/js/js-test/yuitest/reports") + "/" + reportName + "." + format;
		
		try {
			FileWriter fstream = new FileWriter(reportFullPath);
			
			out = new BufferedWriter(fstream);
			out.write(results);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			out.close();
		}
	}
}
